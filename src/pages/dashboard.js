import React, { Component } from 'react'
import './dashboard.css'
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className='sidebar'>
          <div className='menu'>
            <h2>Maida</h2>
            <ul>
              <li>
                <a href='dashboard.html'>
                  <i className='fas fa-home'></i>Home
                </a>
              </li>
              <li>
                <a href='#'>
                  <i className='fas fa-arrow-circle-left'></i>Previous
                </a>
              </li>
              <li>
                <a href='login.html'>
                  <i className='fas fa-sign-out-alt'></i>Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='locationcont'>
          <div className='current'>
            <input
              className='loc'
              id='source'
              type='text'
              align='center'
              placeholder='Current Location'
              required
            />
            <input
              className='loc'
              id='destination'
              type='text'
              align='center'
              placeholder='Drop-off Location'
              required
            />
          </div>
          <div className='button'>
            <button className='btn' onclick='initMap()'>
              Search
            </button>
          </div>
        </div>
        <div className='wrapper'>
          <div>
            <p>Main Area</p>
          </div>
          <div id='map'>
            <div id='msg'></div>
          </div>
        </div>
      </div>
    )
  }
}
export default Dashboard
