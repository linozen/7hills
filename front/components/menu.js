/* eslint-disable react/no-danger */
/* eslint-disable react/destructuring-assignment */
import Container from './container';

export default function Menu({ props }) {
  // debugging
  // console.log("Menu component:", props)
  return (
    <>
      <div className="bg-olive-500 py-10">
        <Container>
          <div className="prose prose text-gold-500 px-5 mx-auto lg:text-center" data-aos="fade-up" data-aos-duration="1500">
            <div className="text-gold-500 text-6xl pb-14 lg:text-center">
              {props.title}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: props.content }}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
