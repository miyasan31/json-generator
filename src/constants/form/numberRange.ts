/** ランダムオプションの最小値 */
export const MIN_NUMBER = 0;

/** ランダムオプションの最大値 */
export const MAX_NUMBER = 1000;

/** ランダムオプションの最小幅 */
export const MIN_RANGE = 10;

/** ランダムオプションのステップ間隔 */
export const RANGE_STEP = 10;

/** <RangeSlider /> のマーカー中央値 */
const MEDIAN_NUMBER = (MAX_NUMBER + MIN_NUMBER) / 2;

/** <RangeSlider /> のマーカ位置 */
export const RANGE_SLIDER_MARKS = [
  { value: MIN_NUMBER, label: `${MIN_NUMBER}` },
  { value: MEDIAN_NUMBER, label: `${MEDIAN_NUMBER}` },
  { value: MAX_NUMBER, label: `${MAX_NUMBER}` },
];
