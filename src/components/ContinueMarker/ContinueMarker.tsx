import { memo } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import './ContinueMarker.css';

interface ContinueMarkerProps {
    onClick?: () => void;
    color?: string;
}

const ContinueMarker = memo(({ onClick, color = 'whitesmoke' }: ContinueMarkerProps) => {
    return (
        <div className="continue-marker component-continue-marker" onClick={onClick}>
            <IconChevronDown
                size={18}
                stroke={2}
                className="bounce"
                color={color}
            />
        </div>
    );
});

export default ContinueMarker; 