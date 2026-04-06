import { AbsoluteFill } from "remotion";
import { PinnedBanner } from "./PinnedBanner";

/**
 * Preview composition showing all 3 pinned posts side-by-side
 * at full resolution (3240 x 1350) so you can see the seamless banner.
 */
export const PinnedPreview: React.FC = () => {
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {[0, 1, 2].map((panel) => (
        <div key={panel} style={{ width: 1080, height: 1350, position: "relative", flexShrink: 0 }}>
          <PinnedBanner panel={panel} />
        </div>
      ))}
    </AbsoluteFill>
  );
};
