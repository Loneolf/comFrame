import React, { Suspense, lazy, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import "./index.scss";

const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./home"));
const Test = lazy(() => import(/* webpackChunkName: 'test' */ "./test"));
const Reduce = lazy(() => import(/* webpackChunkName: 'reduce' */ "./reduce"));

const RouterConfig = [
	{ name: "reduce", link: "/reduce", el: <Reduce /> },
	{ name: "测试@练习", link: "/test", el: <Test /> },
];

function App() {
	const [activeLink, setActiveLink] = useState("/");
	return (
		<div className="pageWrap">
			<header className="title">
				<Link to='/'><h2>青竹&Loneolf</h2></Link>
				<ul className="navList">
					{RouterConfig.map((item) => {
						return (
							<li
								onClick={() => setActiveLink(item.link)}
								key={item.name}
                                className={activeLink === item.link ? 'activeLi' : ''}
							>
								<Link to={item.link}>{item.name}</Link>
							</li>
						);
					})}
				</ul>
			</header>
			<Suspense fallback={<Spin />}>
				<main className="main">
					<Routes>
						<Route path="/" element={<Home />}></Route>
						{RouterConfig.map((item) => {
							return (
								<Route key={item.link} path={item.link} element={item.el}></Route>
							);
						})}
					</Routes>
				</main>
			</Suspense>
		</div>
	);
}

export default App;
