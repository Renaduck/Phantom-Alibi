import { memo, useCallback, useEffect } from 'react';
import { IconHelpCircle } from '@tabler/icons-react';
import useStore from '../../core/store';
import './HelpButton.css';

const HelpButton = memo(() => {
    const showHelp = useStore(state => state.showHelp);

    // Handle click event
    const handleClick = useCallback(() => {
        showHelp();
    }, [showHelp]);

    // Mimic the original behavior of fading in the help button
    useEffect(() => {
        const timer = setTimeout(() => {
            const button = document.getElementById('help-btn');
            if (button) {
                button.style.opacity = '1';
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            id="help-btn"
            onClick={handleClick}
            style={{ opacity: 0 }}
        >
            <IconHelpCircle size={32} />
        </div>
    );
});

export default HelpButton; 