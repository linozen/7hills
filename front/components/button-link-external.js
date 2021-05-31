import Link from "next/link";
import { useRouter } from "next/router";

export default function ButtonLinkExternal(props) {
  const title = props.title;
  const link = props.link;
  const curRoute = useRouter().pathname;
  const onEvents = curRoute == "/events" ? true : false;

  return (
    <>
      <a href={link} target="_blank">
        <button
          className={`button ${
            onEvents
              ? "bg-blue-dark border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-blue-dark"
              : "bg-olive-500 border-gold-500 text-gold-500 hover:bg-gold-400 hover:text-olive-500"
          }`}
        >
          {title}
        </button>
      </a>
    </>
  );
}
