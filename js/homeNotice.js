function NoticeBoard(containerId, jsonDataUrl) {
    const infoContainer = document.getElementById(containerId);
    let jsonData = [];
    let scrollPosition = 0;

    // load JSON data
    fetch(jsonDataUrl)
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            displayInfo();
        });

    function displayInfo() {
        let html = '';
        jsonData.forEach((item, index) => {
            html += (
                `<div class="info-item">
                  <i class="fa fa-angles-right" style="color: #3d4785;"></i>
                  <a href="${item.link}" target="_blank" style="color:black">${item.info}</a>
                  <span class="info-date">--${item.date}</span>
                </div>`
              )
        });
        infoContainer.innerHTML = html;
        scrollInfo();
    }

    function scrollInfo() {
        let intervalId = setInterval(() => {
            scrollPosition += 1;
            infoContainer.scrollTop = scrollPosition;
            if (scrollPosition > infoContainer.scrollHeight) {
                scrollPosition = 0;
            }
        }, 30);
    }
}

// Usage
NoticeBoard('notice-container', './json/notices.json');
NoticeBoard('achieve-container', './json/achievements.json');