import { useTranslation } from "react-i18next";

function ImageForm({ setName, setDescription, submitHandler }) {
  const { t } = useTranslation();
  return (
    <form onSubmit={submitHandler}>
      <div>
        <p>
          <b>{t("mainPage.createYourImage")}</b>
        </p>
        <input
          type="text"
          placeholder={t("mainPage.createName")}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <textarea
          placeholder={t("mainPage.createDescription")}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button type="submit">{t("mainPage.create")}</button>
      </div>
    </form>
  );
}

export default ImageForm;
