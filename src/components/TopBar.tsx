import logo from "../assets/logo.png";
// import back_icon from '../assets/return.png';
import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { toPng } from 'html-to-image';

export default function TopBar() {
  const downloadImage = (dataUrl: string) => {
    const a = document.createElement('a');

    a.setAttribute('download', 'reactflow_viz.png');
    a.setAttribute('href', dataUrl);
    a.click();
  }
  const imageWidth = 1024;
  const imageHeight = 768;
  const { getNodes } = useReactFlow();

  const onClickDownload = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2, 2);
    const viewportEl = document.querySelector('.react-flow__viewport') as HTMLElement | null;
    if (!viewportEl) return;
 
    toPng(viewportEl, {
      backgroundColor: 'white',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <div className="topbar">
        <div className="topbar-left">
            <img src={logo} alt="Logo" className="topbar-logo" />
        </div>
        <div className="topbar-right">
            {/* <button className="topbar-btn" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <img src={back_icon} alt="back-icon" className="topbar-icon" />
                Back
            </button>

            <button className="topbar-btn">New workflow</button>
            <button className="topbar-btn">Save changes</button> */}
            <button className="topbar-btn"
              onClick={onClickDownload}
              >Export
            </button>
        </div>
    </div>
  );
}
