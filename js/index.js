(() => {
  let scrollY = 0; // window.scrollY의 값을 저장할 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(scrollY)보다 이전에 위치한 section들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화 된 씬(scroll-section)

  const sceneInfo = [
    {
      // scene 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
      },
    },
    {
      // scene 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      // scene 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      // scene 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  function setLayout() {
    //각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 페이지 로드 시 현재 스크롤 위치에 맞게 currentScene 세팅
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= scrollY) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function scrollLoop() {
    // 현재 스크롤이 위치한 section 판별하기
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (scrollY > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (scrollY < prevScrollHeight) {
      if (currentScene === 0) return; // 브라우저 바운스 현상으로 인해 마이너스 값이 되는 것을 방지 (Mobile)
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
  }

  window.addEventListener('scroll', () => {
    // 현재 스크롤 위치 변수에 담기
    scrollY = window.scrollY;
    scrollLoop();
  });
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})();
