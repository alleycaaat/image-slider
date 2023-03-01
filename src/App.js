import { useEffect, useRef, useState } from 'react';

import { constants } from './util/constants';
import { Button } from './components/UI/Button';
import { Slide } from './components/Slide';
import { Info } from './components/Info';

import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';

const getHeight = () => window.innerHeight;

const App = () => {
  let slides = constants.slide,
    images = constants.images;

  const firstImage = images[0];
  const secondImage = images[1];
  const lastImage = images[images.length - 1];

  const firstInfo = slides[0];
  const secondInfo = slides[1];
  const lastInfo = slides[slides.length - 1];

  const infoRef = useRef();
  const movingRef = useRef();
  const startmovingRef = useRef();

  const [state, setState] = useState({
    activeSlide: 0,
    moving: false,
    movespeed: 1,
    movedistance: getHeight(),
    leftmovedistance: getHeight() * -1,
    slideDisplay: [lastImage, firstImage, secondImage],
    infoDisplay: [secondInfo, firstInfo, lastInfo],
  });

  const { activeSlide, leftmovedistance, moving, movespeed, movedistance, slideDisplay, infoDisplay } = state;

  useEffect(() => {
    movingRef.current = adjustSlides;
    startmovingRef.current = slidemoving;
  });

  useEffect(() => {
    //get what slide is currently displaying
    const imageSlide = infoRef.current;

    const donemoving = () => {
      movingRef.current();
    };

    const startmoving = () => {
      startmovingRef.current();
    };

    const resize = () => {
      setState({
        ...state,
        height: getHeight(),
        movedistance: getHeight(),
      });
    };

    //add event listeners
    imageSlide.addEventListener('transitionend', donemoving);
    imageSlide.addEventListener('transitionstart', startmoving);
    window.addEventListener('resize', resize);

    //remove event listeners
    return () => {
      imageSlide.removeEventListener('transitionend', donemoving);
      imageSlide.removeEventListener('transitionstart', startmoving);
      window.removeEventListener('resize', resize);
    };
  }, []); // eslint-disable-line

  //if slides aren't moving, set the movespeed to 1s
  //and moving to false, so the arrow buttons will work
  useEffect(() => {
    if (movespeed === 0) {
      setState({
        ...state,
        movespeed: 1,
        moving: false
      });
    }
  }, [movespeed]); // eslint-disable-line

  const slidemoving = () => {
    setState({
      ...state,
      moving: true
    });
  };

  const upclick = () => {
    if (moving) {
      return;
    }
    setState({
      ...state,
      movedistance: movedistance + getHeight(),
      leftmovedistance: leftmovedistance + getHeight(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });
  };

  const downclick = () => {
    if (moving) {
      return;
    }
    setState({
      ...state,
      movedistance: movedistance - getHeight(),
      leftmovedistance: leftmovedistance - getHeight(),
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });
  };

  const adjustSlides = () => {
    let slideDisplay = [],
      infoDisplay = [];

    //at the end
    if (activeSlide === images.length - 1) {
      slideDisplay = [images[images.length - 2], lastImage, firstImage];
      infoDisplay = [firstInfo, lastInfo, slides[slides.length - 2]];

      //back to the start: reset to the starting lineup
    } else if (activeSlide === 0) {
      slideDisplay = [lastImage, firstImage, secondImage];
      infoDisplay = [secondInfo, firstInfo, lastInfo];

      //otherwise cut out a custom group
    } else {
      slideDisplay = images.slice(activeSlide - 1, activeSlide + 2);
      infoDisplay = [slides[activeSlide + 1], slides[activeSlide], slides[activeSlide - 1]];
    }

    setState({
      ...state,
      slideDisplay,
      infoDisplay,
      movespeed: 0,
      leftmovedistance: -getHeight(),
      movedistance: getHeight()
    });
  };

  return (
    <div id='container'>
      <span className='sr-only'>All links are external</span>
      <div id='left' ref={infoRef}
        style={{
          transform: `translateY(${ leftmovedistance }px)`,
          transition: `transform ease-out ${ movespeed }s`,
          height: (getHeight() * slideDisplay.length) + getHeight(),
        }}>
        {
          infoDisplay.map((slide, i) => (
            <Info
              top={slides.length - 1}
              key={i}
              info={slide}
              height={getHeight()}
            />
          ))
        }
      </div>
      <div id='right'
        style={{
          transform: `translateY(-${ movedistance }px)`,
          transition: `transform ease-out ${ movespeed }s`,
          height: getHeight() * slideDisplay.length
        }}>
        {slideDisplay.map((img, i) => (
          <Slide
            height={getHeight()}
            key={i}
            image={img}
          />
        ))
        }
      </div>
      <div>
        <Button
          arialabel='down arrow'
          onClick={downclick}
          className='down-button'>
          <BsArrowDownCircle />
        </Button>
        <Button
          arialabel='up arrow'
          onClick={upclick}
          className='up-button'>
          <BsArrowUpCircle />
        </Button>
      </div>
    </div>
  );
};

export default App;
