export default (val = 'Oops, something went wrong') => {
  window.M.toast({ html: val });
};
