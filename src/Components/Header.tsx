import styled from 'styled-components';
import { faMagnifyingGlass, faBell, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useRouteMatch } from 'react-router-dom';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const Navigation = styled(motion.nav)`
  z-index: 100;
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  background-color: #f8012d;
  padding: 20px 60px;
  box-shadow: 0 1px 15px -7.5px #000000;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
  }
  li {
    margin-right: 50px;

    &:hover {
      text-underline-position: under;
      text-decoration: underline;
    }
  }
  button {
    all: unset;
    padding: 1px;
    font-size: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
`;
const Logo = styled(motion.div)`
  margin-right: 50px;

  h1 {
    font-size: 30px;
    font-family: 'Bangers', cursive;
    text-shadow: -1px -1px yellow, 1px 1px orange, 2px 2px orange;
    -webkit-transform: rotate(-10deg) skew(-10deg, 0);
    -moz-transform: rotate(-10deg) skew(-10deg, 0);
    -ms-transform: rotate(-10deg) skew(-10deg, 0);
    -o-transform: rotate(-10deg) skew(-10deg, 0);
    transform: rotate(-10deg) skew(-10deg, 0);
    color: #222;
  }
`;
const Items = styled.ul``;
const Item = styled.li<{ isClicked: boolean }>`
  text-underline-position: under;
  text-decoration: ${(props) => (props.isClicked ? 'underline' : 'none')};
`;
const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  svg {
    height: 23px;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid white;
`;
const logoVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      // how many times we want to repeat the animation
      yoyo: Infinity,
    },
  },
};
const navVariants = {
  top: {
    backgroundColor: 'rgba(255, 0, 0, 1)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const isHome = useRouteMatch('/');
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start('scroll');
      } else {
        navAnimation.start('top');
      }
    });
  }, [scrollY, navAnimation]);
  return (
    <Navigation variants={navVariants} animate={navAnimation} initial={'top'}>
      <Column>
        <Logo variants={logoVariants} whileHover="hover">
          <h1>MARVEL GALLERY</h1>
        </Logo>
      </Column>

      <Column>
        <Search>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -212 : 0 }}
            transition={{ type: 'linear' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            ></path>
          </motion.svg>
          <Input
            transition={{ type: 'linear' }}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            placeholder="Search for movie or tv show..."
          />
        </Search>
        <button>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button>
          <FontAwesomeIcon icon={faUserAstronaut} />
        </button>
      </Column>
    </Navigation>
  );
}

export default Header;
