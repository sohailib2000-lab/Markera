import "./index.css";
import { Composition, Folder, Still } from "remotion";
import { BrandedPost } from "./BrandedPost";
import { BrandedPost2 } from "./BrandedPost2";
import { BrandedPost3 } from "./BrandedPost3";
import { BrandReel } from "./BrandReel";
import { BrandReel2 } from "./BrandReel2";
import { BrandReel3 } from "./BrandReel3";
import { PinnedBanner } from "./PinnedBanner";
import { PinnedPreview } from "./PinnedPreview";
import { RedFlagsReel } from "./RedFlagsReel";
import { RedFlagsCarousel } from "./RedFlagsCarousel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Posts">
        <Still
          id="BrandedPost"
          component={BrandedPost}
          width={1080}
          height={1350}
        />
        <Still
          id="BrandedPost2"
          component={BrandedPost2}
          width={1080}
          height={1350}
        />
        <Still
          id="BrandedPost3"
          component={BrandedPost3}
          width={1080}
          height={1350}
        />
        <Still
          id="RedFlagsCarousel-1"
          component={RedFlagsCarousel}
          width={1080}
          height={1350}
          defaultProps={{ slide: 0 }}
        />
        <Still
          id="RedFlagsCarousel-2"
          component={RedFlagsCarousel}
          width={1080}
          height={1350}
          defaultProps={{ slide: 1 }}
        />
        <Still
          id="RedFlagsCarousel-3"
          component={RedFlagsCarousel}
          width={1080}
          height={1350}
          defaultProps={{ slide: 2 }}
        />
        <Still
          id="RedFlagsCarousel-4"
          component={RedFlagsCarousel}
          width={1080}
          height={1350}
          defaultProps={{ slide: 3 }}
        />
        <Still
          id="RedFlagsCarousel-5"
          component={RedFlagsCarousel}
          width={1080}
          height={1350}
          defaultProps={{ slide: 4 }}
        />
      </Folder>
      <Folder name="Pinned-Banner">
        <Still
          id="PinnedLeft"
          component={PinnedBanner}
          width={1080}
          height={1350}
          defaultProps={{ panel: 0 }}
        />
        <Still
          id="PinnedCenter"
          component={PinnedBanner}
          width={1080}
          height={1350}
          defaultProps={{ panel: 1 }}
        />
        <Still
          id="PinnedRight"
          component={PinnedBanner}
          width={1080}
          height={1350}
          defaultProps={{ panel: 2 }}
        />
      </Folder>
      <Still
        id="PinnedPreview"
        component={PinnedPreview}
        width={3240}
        height={1350}
      />
      <Folder name="Reels">
        <Composition
          id="BrandReel"
          component={BrandReel}
          durationInFrames={310}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandReelV2"
          component={BrandReel2}
          durationInFrames={385}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="BrandReelV3"
          component={BrandReel3}
          durationInFrames={330}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="RedFlagsReel"
          component={RedFlagsReel}
          durationInFrames={660}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
