import Carousel from 'react-bootstrap/Carousel';

const Crousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://c0.wallpaperflare.com/preview/34/705/139/tasks-plan-target-list.jpg"
          alt="First slide"
          height = '400px'
        />
        <Carousel.Caption>
          <h3>Task Lists</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg"
          alt="Second slide"
          height = '400px'
        />

        <Carousel.Caption>
          <h3>Manage Task </h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.addictivetips.com/app/uploads/2011/07/Message.jpg"
          alt="Third slide"
          height = '400px'
        />

        <Carousel.Caption>
          <h3>Monitor Analytics</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Crousel;