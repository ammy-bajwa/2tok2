export default function Index() {
  return (
    <section className="full_height_100vh_home" id="home">
      <div className="home_table_cell absolue-hero-overlay">
        <div className="home_table_cell_center">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <h1 className="home_title text-dark mx-auto text-capitalize mb-0">
                    <div className="simple-text-rotate">
                      Secure & Easy Way to Trade
                    </div>
                  </h1>
                  <div className="home_text_details">
                    <p className="home_subtitle text-dark mt-3 mx-auto mb-0">
                      Unordinary digital agency crafting sophisticated and
                      eccentric stuff that will leave you speechless{" "}
                    </p>
                  </div>
                  <div className="home_btn_manage mt-4">
                    <a className="btn btn-default mr-3" href="/user/login">
                      Login
                    </a>
                  </div>
                  <div className="home_recent_trades mx-auto mb-0 mt-5">
                    <div id="w0" className="grid-view">
                      <table className="table table-light">
                        <thead>
                          <tr>
                            <th>Symbol</th>
                            <th>
                              <span className="hidden-sm-down">Last Price</span>
                              <span className="hidden-md-up">Last</span>
                            </th>
                            <th>
                              <span className="hidden-sm-down">24H Change</span>
                              <span className="hidden-md-up">Change</span>
                            </th>
                            <th className="d-none d-md-table-cell">24H High</th>
                            <th className="d-none d-md-table-cell">24H Low</th>
                            <th>
                              <span className="hidden-sm-down">24H Volume</span>
                              <span className="hidden-md-up">Volume</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr data-key="0">
                            <td>CSR/CWMEUR</td>
                            <td>€0</td>
                            <td>
                              <span className="text-success">0.0%</span>
                            </td>
                            <td className="d-none d-md-table-cell">€0</td>
                            <td className="d-none d-md-table-cell">€0.0000</td>
                            <td>€0.0000</td>
                          </tr>
                          <tr data-key="1">
                            <td>CSR/USDT</td>
                            <td>€0</td>
                            <td>
                              <span className="text-success">0.0%</span>
                            </td>
                            <td className="d-none d-md-table-cell">€0</td>
                            <td className="d-none d-md-table-cell">€0.0000</td>
                            <td>€0.0000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="row recent-trade-row">
                      <div className="col-12 col-lg-4">
                        <div className="recent-trades-item">
                          <div className="recent-trades-volume-data">€0</div>
                          <div className="recent-trades-volume-title">
                            24 Hour Volume
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4">
                        <div className="recent-trades-item">
                          <div className="recent-trades-volume-data">€0</div>
                          <div className="recent-trades-volume-title">
                            7 Day Volume
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4">
                        <div className="recent-trades-item">
                          <div className="recent-trades-volume-data">€0</div>
                          <div className="recent-trades-volume-title">
                            30 Day Volume
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll_down">
        <a href="#why" className="scroll">
          <i className="mdi mdi-chevron-double-down text-dark"></i>
        </a>
      </div>
    </section>
  );
}
