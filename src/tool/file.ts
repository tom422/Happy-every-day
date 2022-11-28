import { saveAs } from "file-saver";
import Worker from "worker-loader!./zip.worker";

export function fileSave(blob: Blob | string, fileName: string) {
  saveAs(blob, fileName);
}

export function fileSize(size: number) {
  if (!size) return "0K";

  var num = 1024.0; //byte

  if (size < num) return size + "B";
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + "K"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

// 下载文件
export function fileZip() {
  const worker = new Worker({ type: "model" });
  // 主进程向子进程发送信息:
  worker.postMessage({
    type: "ok",
  });

  // 主进程接收子进程返回信息:
  worker.onmessage = (res) => {
    console.log(res);
    saveAs(res.data as unknown as Blob, "example.zip");
    // 关掉进程
    worker.terminate();
  };

  worker.onerror = () => {
    console.log("worker.onerror");
    // 关掉进程
    worker.terminate();
  };
}
