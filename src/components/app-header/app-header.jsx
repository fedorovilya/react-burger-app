import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {

	// TODO возможно, надо будет поменять когда буду делать навигацию (пока страница грузится заново при клике на адрес)
	const CONSTRUCTOR_LINK = "/constructor";
	const ORDER_LIST_LINK = "/orders";
	const PROFILE_LINK = "/profile";

	return (
		<header style={{
			width: "100%",
			height: "88px",
			background: "#1C1C21",
			position: "relative"
		}}>
			<div
				style={{
					left: "50%",
					transform: "translateX(-50%)",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					width: "1280px",
					height: "100%",
					position: "absolute",
				}}>
				<div className={"p-2"} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
					<a href={CONSTRUCTOR_LINK} className={"p-4"}>
						<div className={"ml-2"}
							 style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
							<BurgerIcon type={"primary"}></BurgerIcon>
							<p className={window.location.pathname === CONSTRUCTOR_LINK ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>
								Конструктор
							</p>
						</div>
					</a>
					<a href={ORDER_LIST_LINK} className={"p-4"}>
						<div className={"ml-2"}
							 style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
							<ListIcon type={"primary"}></ListIcon>
							<p className={window.location.pathname === ORDER_LIST_LINK ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>
								Лента заказов
							</p>
						</div>
					</a>
				</div>
				<a href={CONSTRUCTOR_LINK} className={"p-4"} style={{position: "relative", right: "100px"}}>
					<Logo></Logo>
				</a>
				<a href={PROFILE_LINK} className={"p-4"}>
					<div className={"ml-2"}
						 style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
						<ProfileIcon type={"primary"}></ProfileIcon>
						<p className={window.location.pathname === PROFILE_LINK ? "text text_type_main-default" : "text text_type_main-default text_color_inactive"}>
							Личный кабинет
						</p>
					</div>
				</a>

			</div>
		</header>
	);
}
