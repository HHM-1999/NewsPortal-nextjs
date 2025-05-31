import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">News Portal.com</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" href="/national">জাতীয়</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/international">আন্তর্জাতিক</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/sports">খেলা</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/economics">অর্থনীতি</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/agriculture">কৃষি</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/feature">ফিচার</Link>
                            </li>
                           
                            <li className="nav-item">
                                <Link className="nav-link" href="/entertainment">বিনোদন</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/archieves">আর্কাইভ</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header