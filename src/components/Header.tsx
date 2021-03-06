import Link from 'next/link';
import { useColorMode } from 'theme-ui';
import { Container, Flex, NavLink, Button } from '@theme-ui/components';

export default function Header() {
  const [colorMode, setColorMode] = useColorMode();
  return (
    // see theme.layout.container for styles
    <Container as="header">
      <Flex as="nav">
        {/* passHref is required with NavLink */}
        <Link href="/" passHref>
          <NavLink p={2} pl={0}>
            Home
          </NavLink>
        </Link>
        <Link href="/style" passHref>
          <NavLink p={2}>Style Guide</NavLink>
        </Link>
        <Button
          ml="auto"
          onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        >
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Flex>
    </Container>
  );
}
