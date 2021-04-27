/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from 'next/router';

export default function Container({ children }) {
  const curRoute = useRouter().pathname;
  const onEvents = (curRoute == "/events") ? true : false
  return <div className={`container mx-auto ${onEvents ? 'bg-blue-dark' : 'bg-olive-500'}`} > {children}</div >;
}
