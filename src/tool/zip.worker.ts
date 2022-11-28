import JSZip from 'jszip'
// const ctx: Worker = self as any;
const ctx = self
const zip = new JSZip()
const img = zip.folder("images");
// 监听 message 事件
ctx.addEventListener('message', (res) => {
  console.log('很好收到消息了:',res);

  fetch('http://rlwbdailh.hn-bkt.clouddn.com/demo.jpg?e=1669615855&token=zzYq8yJfigLqri2mrU-KuHQhqlYWWA0TOHzpnmMH:QnNVpHTmQaAb_XyLHnUyPWvgnv8=').then(function(response) {
   
    return response.blob();
  }).then(function(data) {
    (img as JSZip).file("smile.jpg", data);
   
    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            ctx.postMessage(content);
        });
    console.log(data);
  }).catch(function(e) {
    console.log("Oops, error");
  });
//   // 向主线程发送消息
//   if (res.data.type === 'ok') {
//      ctx.postMessage('你错没？');
//   } else {
//     throw new Error('error');
//   }
}, false);

// 或
// ctx.onmessage = (e) => {
// };

// 监听错误事件
ctx.addEventListener('error', (e) => {
  console.log('error');
});

// 或
// ctx.onerror = (e) => {
//   console.log(e);
// };

// export default ctx;