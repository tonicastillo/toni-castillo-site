import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { VideoContext } from "../components/videoPlayer";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(true);
  const [isNavPanelOpen, setIsNavPanelOpen] = useState(true);
  const videoContext = useContext(VideoContext);
  const { videoControls } = videoContext;

  const wasNavPanelOpen = useRef();

  useEffect(() => {
    if (isProjectInfoOpen) setIsNavPanelOpen(false);
  }, [isProjectInfoOpen]);
  useEffect(() => {
    if (isNavPanelOpen) {
      wasNavPanelOpen.current = videoControls.status.isPlaying;
      videoControls.actions?.pause();
      // setIsProjectInfoOpen(false);
    } else {
      if (wasNavPanelOpen.current) videoControls.actions?.play();
    }
  }, [isNavPanelOpen]);
  return (
    <GeneralContext.Provider
      value={{
        isProjectInfoOpen: isProjectInfoOpen,
        setIsProjectInfoOpen: setIsProjectInfoOpen,
        isNavPanelOpen: isNavPanelOpen,
        setIsNavPanelOpen: setIsNavPanelOpen,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
