import FrontPageNav from "./FrontPageNav";
import PrivateArea from "./PrivateArea";
import Logo from "./Logo";
import { Stack } from "react-bootstrap";

// Header de la página principal
function Header() {
  return (
    <Stack direction="horizontal" className="my-3">
      <div className="mx-auto">
        <Logo />
      </div>

      <div className="mx-auto">
        <FrontPageNav />
      </div>

      <div className="mx-auto">
        <PrivateArea />
      </div>
    </Stack>
  );
}

export default Header;
