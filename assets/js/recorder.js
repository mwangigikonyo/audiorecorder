// assets/js/recorder.js
let mediaRecorder, chunks = [];

async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' }); // lightweight codec
  mediaRecorder.ondataavailable = e => chunks.push(e.data);
  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    const form = new FormData();
    form.append('_csrf', window.SAILS_LOCALS._csrf);
    form.append('audio', blob, 'recording.webm');
    await fetch('/audio/upload', { method: 'POST', body: form });
    alert('Uploaded! Check your .tmp/audio folder.');
    chunks = [];
  };
  mediaRecorder.start();
}
async function stop() {
    mediaRecorder.stop();
}

