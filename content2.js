var s1 = document.createElement('script');
s1.onload = function() {
    this.remove();
};
s1.innerHTML = 'stop_status = 1;';
(document.head || document.documentElement).appendChild(s1);