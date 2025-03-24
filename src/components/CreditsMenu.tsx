import useStore from '../store';

const CreditsMenu = () => {
  const { creditsMenuVisible, hideCredits } = useStore(state => ({
    creditsMenuVisible: state.creditsMenuVisible,
    hideCredits: state.hideCredits
  }));

  if (!creditsMenuVisible) {
    return null;
  }

  return (
    <div id="credits-menu" className="show">
      <h2>Credits</h2>
      <hr />
      <span>Created by: <a href="" target="_blank">Not Real Studio</a></span>
      <span>Story & Artwork: <a href="https://github.com/Renaduck" target="_blank">Effy</a></span>
      <span>Sound Effects: <a href="https://github.com/jfeenfalcon" target="_blank">Jake, </a>
        <a href="" target="_blank">Jayden, </a>
        <a href="" target="_blank">Mauricio</a>
      </span>
      <span>Game Developers: <a href="https://github.com/jfeenfalcon" target="_blank">Jake, </a>
        <a href="" target="_blank">Jayden, </a>
        <a href="" target="_blank">Mauricio</a>
      </span>
      <button id="close-credits-btn" onClick={hideCredits}>Close</button>
    </div>
  );
};

export default CreditsMenu; 