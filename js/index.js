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
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        // 텍스트 opacity 값과 구간 지정
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.7 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      // scene 1
      type: 'normal',
      // heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description'),
      },
    },
    {
      // scene 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: [],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 0.97 }],
        messageA_translateY_in: [20, 0, { start: 0.22, end: 0.3 }],
        messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
        messageC_translateY_in: [30, 0, { start: 0.9, end: 0.93 }],
        messageA_opacity_in: [0, 1, { start: 0.22, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageC_opacity_in: [0, 1, { start: 0.9, end: 0.93 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 0.97 }],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 0.97 }],
        pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_scaleY: [0.5, 1, { start: 0.9, end: 0.93 }],
        pinB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        pinC_opacity_in: [0, 1, { start: 0.9, end: 0.93 }],
        pinB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        pinC_opacity_out: [1, 0, { start: 0.95, end: 0.97 }],
      },
    },
    {
      // scene 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagePath: ['./images/blend-image-1.jpg', './images/blend-image-2.jpg'],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        rectStartY: 0,
      },
    },
  ];

  // canvas에 그려서 처리할 이미지들을 세팅할 함수 생성
  function setCanvasImages() {
    // sceneInfo[0]
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      // 이미지 객체 생성 imgElem = document.createElement('img');와 동일함
      imgElem = new Image();
      imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    // sceneInfo[2]
    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      // 이미지 객체 생성 imgElem = document.createElement('img');와 동일함
      imgElem2 = new Image();
      imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    //sceneInfo[3]
    let imgElem3;
    for (let i = 0; i < sceneInfo[3].objs.imagePath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[3].objs.imagePath[i];
      sceneInfo[3].objs.images.push(imgElem3);
    }
  }
  setCanvasImages();

  function setLayout() {
    // 각 section의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      // sceneInfo type에 따른 scrollHeight 예외처리
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
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

    // 가로세로 비율에 맞게 canvas 크기 조정
    // 원래 캔버스 높이인 1080과 윈도우 창 높이와 비교해서 비율 구하기 -> 그 비율대로 scale값 맞춰주면 된다! (1 = 100%)
    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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

  function playAnimation() {
    // 스크롤 애니메이션 진행
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight; // 현재 씬에서 스크롤 된 높이
    const scrollHeight = sceneInfo[currentScene].scrollHeight; // 현재 씬의 scorllHeight
    const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight; // 현재 씬에서 스크롤 된 범위의 비율

    switch (currentScene) {
      case 0:
        // canvas의 context 객체를 사용해 이미지 그리기
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        // canvas opacity 설정
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

        // 스크롤 비율 및 구간에 따른 텍스트 애니메이션 설정
        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;

      case 2:
        console.log(scrollRatio);
        // canvas의 context 객체를 사용해 이미지 그리기
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
        // canvas opacity 설정
        if (scrollRatio <= 0.5) {
          // in
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          // out
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }

        if (scrollRatio <= 0.35) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.7) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.93) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        // currentScene 3의 캔버스 미리 그려주기 시작
        if (scrollRatio > 0.9) {
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;

          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            // 캔버스보다 브라우저 창의 폭이 작은 경우
            canvasScaleRatio = heightRatio;
          } else {
            // 캔버스보다 브라우저 창의 높이가 작은 경우
            canvasScaleRatio = widthRatio;
          }

          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.fillStyle = '#fff';
          objs.context.drawImage(objs.images[0], 0, 0);

          // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight 구하기
          const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          // 좌우 화이트박스 그리기 (애니메이션 전 기본 상태) -> calcValues없이 초기값으로 설정
          objs.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
          objs.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
        }

        break;

      case 3:
        // 가로 세로 꽉 차게 하기 위해 playAnimation에서 세팅 (캔버스 크기 계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창의 폭이 작은 경우
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창의 높이가 작은 경우
          canvasScaleRatio = widthRatio;
        }

        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = '#fff';
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight 구하기
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        // rectStartY 기본값일 경우에만 캔버스의 Y위치 계산하도록 설정
        if (!values.rectStartY) {
          // offsetTop에 캔버스가 늘어나거나 줄어든 비율을 적용해서 캔버스의 Y위치(top값) 구하기
          values.rectStartY =
            objs.canvas.offsetTop +
            (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;

          // start & end 지점 설정
          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        // 화이트박스 영역 recalculatedInnerWidth의 15% 정도 비율로 결정
        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        // 좌측 화이트박스 X좌표 초기값 = (1920px - 재계산된 블랙 영역) / 2
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        // 좌측 화이트박스 X좌표 최종값 = 좌측 화이트박스 X좌표 초기값 - 화이트박스 영역의 폭
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        // 우측 화이트박스 X좌표 초기값 = 좌측 화이트박스 X좌표 초기값 + 블랙영역 폭 - 화이트박스 영역의 폭
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        // 우측 화이트박스 X좌표 최종값 = 우측 화이트박스 X좌표 초기값 + 화이트박스 영역의 폭
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 좌우 화이트박스 그리기 (애니메이션 전 기본 상태)
        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );

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

    playAnimation();
  }
  window.addEventListener('scroll', () => {
    // 현재 스크롤 위치 변수에 담기
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener('resize', setLayout);
  window.addEventListener('load', () => {
    setLayout();
    // 화면 로드됐을 때 canvas 첫 이미지 그려주기
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });
})();
