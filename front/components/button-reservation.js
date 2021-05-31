import { useRouter } from "next/router";

export default function ReservationButton(props) {
  const title = props.title;

  const curRoute = useRouter().pathname;
  const onEvents = curRoute == "/events" ? true : false;

  return (
    <>
      <a
        href="https:www.opentable.de/restref/client/?restref=248958&lang=de-DE&ot_source=Restaurant%20website&corrid=b92b7fc3-8dab-4563-8edd-464ff717eb79"
        target="_blank"
      >
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
