const noop = () => { };
const Thing = typeof window !== 'undefined' ? BroadcastChannel : noop;

const useBroadcastChannel = (id, onmessage, channelName = 'global') => {
  const bc = new Thing(channelName);

  bc.onmessage = (...args) => {
    onmessage(...args);
  };

  return {
    close: bc.close || noop,
    update: (updatedState) => {
      bc?.postMessage({
        type: 'BROADCAST_CHANNEL_RESET',
        payload: updatedState,
      });
    },
  };
};
export default useBroadcastChannel;
