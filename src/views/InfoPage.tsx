import ThemeSwitcher from "../components/ThemeSwitcher";
import UIInfo from "../components/UIInfo";

function InfoPage() {
  return (
    <div>
      <h1 style={{ marginLeft: "20px", marginRight: "20px" }}>
        Информация о настройках UI/UX kit
      </h1>
      <UIInfo />
    </div>
  );
}

export default InfoPage;