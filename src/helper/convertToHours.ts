export default function timeConvert(duration: number) {
  const hours = Number(duration / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  if (duration < 61) {
    return `${rminutes}m`;
  }
  return rhours + "h " + rminutes + "m";
}
