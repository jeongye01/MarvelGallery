import styled from 'styled-components';
import { faMagnifyingGlass, faBell, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useRouteMatch } from 'react-router-dom';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
const Navigation = styled(motion.nav)`
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  background-color: red;
  padding: 20px 60px;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 100px;
  path {
    stroke: white;
    stroke-width: 2;
  }
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
  start: { pathLength: 0, fill: 'rgba(255, 255, 255, 0)' },
  end: {
    fill: 'rgba(255, 255, 255, 1)',
    pathLength: 1,
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
        <Logo focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="-215.19 -86.608 1000 402.473">
          <motion.path
            variants={logoVariants}
            initial="start"
            animate="end"
            transition={{
              default: { duration: 3 },
              fill: { duration: 2, delay: 1 },
            }}
            d="M631.063,7.184v-61.603H459.644l-28.191,205.803L403.557-54.418H341.74l6.925,54.915
			c-7.14-14.068-32.449-54.915-88.146-54.915c-0.367-0.024-61.901,0-61.901,0l-0.237,299.974L153.324-54.418l-80.959-0.047
			L25.753,256.349L25.777-54.42h-77.483l-27.933,174.585l-27.208-174.583h-77.508v337.906h61.036V120.618l27.764,162.866h32.449
			l27.374-162.866v162.866H81.935l7.14-51.995h47.374l7.116,51.995l115.521,0.071h0.094v-0.071h0.072h0.072V173.799l14.162-2.063
			l29.319,111.819h0.072h59.61h0.07l-0.024-0.071h0.106h0.072l-38.475-131.057c19.498-14.422,41.513-51.047,35.654-86.084V66.32
			c0.07,0.474,36.316,217.38,36.316,217.38l71.065-0.216L515.83-22.8v306.285h115.236v-60.773h-54.7v-77.496h54.7V83.518h-54.7
			V7.184H631.063z M96.265,177.905l16.758-144.461l17.4,144.461H96.265z M273.684,111.201c-4.697,2.278-9.595,3.417-14.363,3.417
			V5.927c0.083,0,0.179-0.022,0.297-0.022c4.78-0.024,40.419,1.446,40.419,53.774C300.037,87.052,287.916,104.299,273.684,111.201
			 M754.044,222.665v60.772H641.63V-54.465h60.526v277.13H754.044z"
          />
        </Logo>
        <Items>
          <Item isClicked={isHome !== null}>
            <Link to="/">홈</Link>
          </Item>
          <Item isClicked={false}>
            <Link to="/">시리즈</Link>
          </Item>
          <Item isClicked={false}>
            <Link to="/">캐릭터</Link>
          </Item>
          <Item isClicked={false}>
            <Link to="/">영화</Link>
          </Item>
        </Items>
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
