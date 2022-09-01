(() => {
  let yOffset = 0; //window.pageOffset 대신 쓸 수 있는 변수
  let prevScrollHeight = 0; // 현재 스크롤 (yOffset)보다 이전에 위치한 스크롤 높이값의 함
  let currentScene = 0; // 현재 활성화된 (눈앞에 보고 있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 씬이 시작되는 순간 true

  const sceneInfo = [
    {
      // scene 0
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollheight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        // 텍스트 opacity 값과 구간 지정
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
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
    // 각 section의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 페이지 로드 시 현재 스크롤 위치에 맞게 currentScene 세팅
    let totalScrollHeight = 0;
    let yOffset = window.pageYOffset;

    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(scroll-section)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      // 애니메이션 재생 구간 계산 (partScrollHeight)
      const partStart = values[2].start * scrollHeight;
      const partEnd = values[2].end * scrollHeight;
      const partScrollHeight = partEnd - partStart;

      if (currentYOffset <= partEnd && currentYOffset >= partStart) {
        rv =
          ((currentYOffset - partStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partStart) {
        rv = values[0];
      } else if (currentYOffset > partEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAinmation() {
    // 스크롤 애니메이션 진행
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight; // 현재 씬에서 스크롤 된 높이
    const scrollHeight = sceneInfo[currentScene].scrollHeight; // 현재 씬의 scorllHeight
    const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight; // 현재 씬에서 스크롤 된 범위의 비율

    console.log(currentScene);

    switch (currentScene) {
      case 0:
        const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);

        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = messageA_opacity_in;
        } else {
          // out
          objs.messageA.style.opacity = messageA_opacity_out;
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    // 현재 스크롤이 위치한 section 판별하기
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return; // 브라우저 바운스 현상으로 인해 마이너스 값이 되는 것을 방지 (Mobile)
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAinmation();
  }
  window.addEventListener('scroll', () => {
    // 현재 스크롤 위치 변수에 담기
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener('resize', setLayout);
  window.addEventListener('load', setLayout);
})();
