import React, { useState, useEffect, useCallback } from 'react';
import useStore from '../../core/store';
import { fetchStoryData } from '../../services/scene';
import { getAsset } from '../../common/assets';
import './InteractiveItems.css';

// Types for interactive items
interface ItemPosition {
    id: string;
    x: number;
    y: number;
    description: string;
    img_src?: string;
    itemType?: 'inventory' | 'dialogue'; // Whether clicking adds to inventory or shows dialogue
    dialogueText?: string; // Text to show when clicked (for dialogue items)
}

interface StoryItem {
    img_src?: string;
    description?: string;
    x: number | string;
    y: number | string;
    itemType?: 'inventory' | 'dialogue';
    dialogueText?: string;
    [key: string]: unknown;
}

const InteractiveItems: React.FC = () => {
    const [items, setItems] = useState<ItemPosition[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [dialogueMessage, setDialogueMessage] = useState<string | null>(null);

    const currentScene = useStore(state => state.currentScene);
    const addToInventory = useStore(state => state.addToInventory);
    const playItemAcquiredSound = useStore(state => state.playItemAcquiredSound);
    const playPageFlipSound = useStore(state => state.playPageFlipSound);

    // Load items for the current scene
    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);

                // Get story data 
                const storyData = await fetchStoryData();

                if (!storyData || !storyData.scenes || !storyData.scenes[currentScene]) {
                    console.log('No valid scene data found');
                    setItems([]);
                    setLoading(false);
                    return;
                }

                const currentSceneData = storyData.scenes[currentScene];
                console.log('Loading items for scene:', currentSceneData);

                // Check if the scene has items
                if (!currentSceneData.items || currentSceneData.items.length === 0) {
                    console.log('No items in current scene');
                    setItems([]);
                    setLoading(false);
                    return;
                }

                // Map item IDs to full item data from story data
                const sceneItems: ItemPosition[] = [];

                for (const itemId of currentSceneData.items) {
                    if (storyData.items && storyData.items[itemId]) {
                        const itemData = storyData.items[itemId] as StoryItem;

                        // Parse coordinates (they might be strings in the data)
                        const x = typeof itemData.x === 'string' ? parseInt(itemData.x, 10) : (itemData.x || 0);
                        const y = typeof itemData.y === 'string' ? parseInt(itemData.y, 10) : (itemData.y || 0);

                        sceneItems.push({
                            id: itemId,
                            x,
                            y,
                            description: itemData.description || '',
                            img_src: itemData.img_src,
                            itemType: itemData.itemType || 'inventory', // Default to inventory item
                            dialogueText: itemData.dialogueText
                        });
                    }
                }

                console.log('Loaded items for scene:', sceneItems);
                setItems(sceneItems);
            } catch (err) {
                console.error('Error loading interactive items:', err);
                setError('Failed to load items');
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, [currentScene]);

    // Hide dialogue message after a delay
    useEffect(() => {
        if (dialogueMessage) {
            const timer = setTimeout(() => {
                setDialogueMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [dialogueMessage]);

    // Handle item click
    const handleItemClick = useCallback((item: ItemPosition) => {
        console.log('Item clicked:', item);

        // Handle based on item type
        if (item.itemType === 'dialogue') {
            // Play sound and show dialogue
            playPageFlipSound();
            if (item.dialogueText) {
                setDialogueMessage(item.dialogueText);
            }
        } else {
            // Default is inventory item
            // Only add items with images to inventory
            if (item.img_src) {
                // Play sound effect
                playItemAcquiredSound();

                // Add to inventory with image asset
                const imageAsset = getAsset(item.img_src, 'sprite');

                addToInventory({
                    id: item.id,
                    name: item.id.replace(/_/g, ' '),
                    description: item.description,
                    img_src: imageAsset
                });

                // Show notification
                const notification = document.createElement('div');
                notification.className = 'item-acquired-notification';
                notification.textContent = `Item acquired: ${item.id.replace(/_/g, ' ')}`;
                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        }
    }, [addToInventory, playItemAcquiredSound, playPageFlipSound]);

    if (loading) {
        return null;
    }

    if (error) {
        return <div className="interactive-items-error">{error}</div>;
    }

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="interactive-items-container">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`interactive-item ${item.itemType === 'dialogue' ? 'dialogue-hotspot' : 'inventory-hotspot'}`}
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                    }}
                    onClick={() => handleItemClick(item)}
                >
                    <div className="item-hotspot"></div>
                    <div className="item-label">{item.description}</div>
                </div>
            ))}

            {dialogueMessage && (
                <div className="dialogue-popup">
                    <p>{dialogueMessage}</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveItems; 