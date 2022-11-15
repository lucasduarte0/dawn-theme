// Wrap an HTMLElement around another HTMLElement or an array of them.
export const wrapEl = (el, wrapper) => {
   if(el !== null){
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);   
   }
};
// 	wrap(document.querySelector('a.wrap_me'), document.createElement('div'));