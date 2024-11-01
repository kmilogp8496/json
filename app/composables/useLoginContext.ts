export default function useLoginContext() {
  return inject('loginContext', {
    openLogin: () => {},
    closeLogin: () => {},
  })
}
