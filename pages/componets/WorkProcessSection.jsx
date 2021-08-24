export default function Index() {
  return (
    <section className="section_all bg-light" id="about-us">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h4 className="section-title" id="why" style={{ fontSize: 44 }}>
              {" "}
              Why choose 1Tok1?{" "}
            </h4>
            <div className="section-title-border mx-auto"></div>
            <p className="text-muted pt-2 section-subtitle mx-auto">
              1Tok1 is a cryptocurrency trading platform focused on Corporate
              Social Responsibility and the CSR Token for anyone and everyone.
              We focus on providing the highest level of security, transparency,
              and customer service.{" "}
            </p>
            <p className="text-muted pt-2 section-subtitle mx-auto">
              Our aim is to provide our users with a reliable and secure
              exchange.{" "}
            </p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="how_it_work_box p-4 mt-3">
              <div className="process_icon text-center">
                <i className="text_custom mdi mdi-security"></i>
              </div>
              <div className="text-center pt-3">
                <h5 className="text-capitalize font-weight-bold">
                  Security first
                </h5>
                <p className="text-muted pt-2">
                  We value your trust and bring you best in class security,
                  including 2FA, cold storage, encrypted wallets, live backups,
                  Captcha and much more.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="how_it_work_box p-4 mt-3">
              <div className="process_icon text-center">
                <i className="text_custom mdi mdi-buffer"></i>
              </div>
              <div className="text-center pt-3">
                <h5 className="text-capitalize font-weight-bold">
                  Robust trading
                </h5>
                <p className="text-muted pt-2">
                  Trade your precious assets hassel free with our easy to use
                  User-Interface backed by strong battle-hardened, community
                  tested code and encrypted transactions.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="how_it_work_box p-4 mt-3">
              <div className="process_icon text-center">
                <i className="text_custom mdi mdi-phone"></i>
              </div>
              <div className="text-center pt-3">
                <h5 className="text-capitalize font-weight-bold">
                  Full-time support
                </h5>
                <p className="text-muted pt-2">
                  Get your queries resolved with 24 * 7 365 days support from
                  our team of dedicated experts with a tailor made personalise
                  experience.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="how_it_work_box p-4 mt-3">
              <div className="process_icon text-center">
                <i className="text_custom mdi mdi-rocket"></i>
              </div>
              <div className="text-center pt-3">
                <h5 className="text-capitalize font-weight-bold">
                  High spending limits
                </h5>
                <p className="text-muted pt-2">
                  With high spending limits at 1Tok1 we enable you to put more
                  money on trades hence maximize your chances of profits.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="how_it_work_box p-4 mt-3">
              <div className="process_icon text-center">
                <i className="text_custom mdi mdi-clock-fast"></i>
              </div>
              <div className="text-center pt-3">
                <h5 className="text-capitalize font-weight-bold">
                  Fast track verification
                </h5>
                <p className="text-muted pt-2">
                  We believe in zero latency when it's about money. We get KYCs
                  verified quickly to let customers trade soon after signing up.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="how_it_work_box p-4 mt-3">
              <div className="process_icon text-center">
                <i className="text_custom mdi mdi-apps"></i>
              </div>
              <div className="text-center pt-3">
                <h5 className="text-capitalize font-weight-bold">
                  Simple & lightweight API
                </h5>
                <p className="text-muted pt-2">
                  Developers can use our API to integrate trade, volumes and
                  rates from 1Tok1 in their applications and websites.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
