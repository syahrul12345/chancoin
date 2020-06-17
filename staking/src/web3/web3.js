export const HasMetamask = () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    return true
  }
  return false
}