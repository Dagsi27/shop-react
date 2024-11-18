
import "./Layout.css";

export default function Layout(props) {
  return (
    <>
      <header className="header">{props.header}</header>
      <main className="layout-content">{props.content}</main> 
      <footer className="footer">{props.footer}</footer>
    </>
  );
}
