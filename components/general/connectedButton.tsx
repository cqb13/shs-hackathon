import Button from "./Button";

type Props = {
  leftTitle: string;
  rightTitle: string;
  leftStyle: "normal" | "red" | "green";
  rightStyle: "normal" | "red" | "green";
  onClickLeft: (event: any) => void;
  onClickRight: (event: any) => void;
  containerClassModifier?: string;
  leftClassModifier?: string;
  rightClassModifier?: string;
};

export default function ConnectedButton({
  leftTitle,
  rightTitle,
  leftStyle,
  rightStyle,
  onClickLeft,
  onClickRight,
  containerClassModifier,
  leftClassModifier,
  rightClassModifier,
}: Props) {
  return (
    <div
      className={`flex ${containerClassModifier ? containerClassModifier : ""}`}
    >
      <Button
        onClick={onClickLeft}
        title={leftTitle}
        style={leftStyle}
        classModifier={`${leftClassModifier} rounded-tr-none rounded-br-none`}
      />
      <Button
        onClick={onClickRight}
        title={rightTitle}
        style={rightStyle}
        classModifier={`${rightClassModifier} rounded-tl-none rounded-bl-none`}
      />
    </div>
  );
}
