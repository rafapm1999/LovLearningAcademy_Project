import classes from "./AboutUs.module.css";

function AboutUs() {
  return (
    <div>
      <div className={classes["container-1"]}>
        <div className={classes["container-info-1"]}>
          <div className={classes.title}>
            <h1>About us</h1>
          </div>
          <div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
              dolore neque autem nam dignissimos ut tempore temporibus
              laboriosam. Beatae nisi aspernatur consectetur. Aliquam voluptate
              ut laborum deserunt eveniet consequuntur blanditiis ex illo
              ratione quo dolor architecto, quis placeat sapiente quia, iusto
              non numquam molestiae inventore animi magnam suscipit obcaecati
              unde.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
