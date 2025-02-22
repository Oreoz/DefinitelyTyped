import {
    Finger,
    FingerCurl,
    FingerDirection,
    GestureDescription,
    GestureEstimator,
    ThumbsUpGesture,
    VictoryGesture,
} from "fingerpose";

function assert(condition: boolean, message: string) {
    console.assert(condition, message);
}

const customGesture = new GestureDescription("CustomGesture");
customGesture.addCurl(Finger.Index, FingerCurl.HalfCurl);
customGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight);

const customCurls = [FingerCurl.HalfCurl, FingerCurl.NoCurl];
const customDirections = [FingerDirection.HorizontalRight, FingerDirection.VerticalUp];

const customMatchScore = customGesture.matchAgainst(customCurls, customDirections);
assert(customMatchScore > 0.5, "Custom gesture matching failed");

const estimator = new GestureEstimator([customGesture]);

const points = [
    {
        x: 0,
        y: 0,
        z: 0,
    },
    {
        x: 1,
        y: 1,
        z: 1,
    },
    {
        x: 2,
        y: 2,
        z: 2,
    },
];

const { gestures, poseData } = estimator.estimate(points, 7);

assert(gestures.length === 1, "Estimator failed to detect custom gesture");
assert(gestures[0].name === "CustomGesture", "Estimator failed to detect custom gesture");
assert(poseData.length === 1, "Estimator failed to detect custom gesture");

const victoryGesture = VictoryGesture;
const thumbsUpGesture = ThumbsUpGesture;

const victoryCurls = [FingerCurl.NoCurl, FingerCurl.FullCurl];
const victoryDirections = [FingerDirection.VerticalUp, FingerDirection.HorizontalRight];

const victoryMatchScore = victoryGesture.matchAgainst(victoryCurls, victoryDirections);
assert(victoryMatchScore > 0.8, "Victory gesture matching failed");

const thumbsUpCurls = [FingerCurl.HalfCurl, FingerCurl.FullCurl];
const thumbsUpDirections = [FingerDirection.VerticalUp, FingerDirection.HorizontalLeft];

const thumbsUpMatchScore = thumbsUpGesture.matchAgainst(thumbsUpCurls, thumbsUpDirections);
assert(thumbsUpMatchScore > 0.8, "Thumbs-up gesture matching failed");
