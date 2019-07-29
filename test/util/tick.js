export default function tick(time = 0) {
  return new Promise(resolve => setTimeout(resolve, time));
}
