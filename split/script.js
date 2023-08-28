for (video of document.getElementsByTagName("video")) {
  video.setAttribute("playsinline", "");
  video.setAttribute("muted", "");
  video.play();
}