const noop = () => { };
const Thing = typeof window !== 'undefined' ? BroadcastChannel : noop;

const useBroadcastChannel = (id, onmessage, channelName = 'global') => {
  const bc = new Thing(channelName);

  bc.onmessage = (...args) => {
    console.info('[BC] %s/%s recieves', channelName, id, args);
    onmessage(...args);
  };

  return {
    close: bc.close || noop,
    update: (updatedState) => {
      console.info('[BC] %s/%s sends', channelName, id);
      bc?.postMessage({
        type: 'BROADCAST_CHANNEL_RESET',
        payload: updatedState,
      });
    },
  };
};
export default useBroadcastChannel;
