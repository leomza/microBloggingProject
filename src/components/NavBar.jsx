import React, { Fragment, useContext } from 'react'
import TweetsList from './TweetsList'
import AddNewTweet from './AddNewTweet'
import { Route, Switch, Link } from 'react-router-dom'
import ProfileForm from './ProfileForm'
import styles from '../styles/navBar.module.css'
import { AuthContext } from '../context/AuthContext'

const NavBar = () => {
  //Use the function "logout" from authContext
  const { authInfo, logout } = useContext(AuthContext)

  return (
    <Fragment>
      <nav className={styles.navBar}>
        <ul className={styles.navBar__list}>
          <li className={styles.navBar__link_content}>
            <Link className={styles.navBar__link} to='/'>
              Home
            </Link>
          </li>
          <li className={styles.navBar__link_content}>
            <Link className={styles.navBar__link} to='/profile'>
              Profile
            </Link>
          </li>
          <li className={styles.navBar__link_content}>
            <button className={styles.navBar__link} onClick={logout}>
              Log Out
            </button>
          </li>
          <li className={styles.navBar__link_content}>
            <p className={styles.navBar__link}>
              {authInfo.name}
            </p>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/' exact>
          <div>
            <AddNewTweet />
            <TweetsList />
          </div>
        </Route>
        <Route path='/profile'>
          <ProfileForm />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default NavBar
