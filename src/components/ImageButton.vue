<template>
    <button class="button-3" role="button"><slot></slot></button>
</template>

<style scoped>
.button-3 {
  appearance: none;
  background-color: var(--accent-color);
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

@media (max-width: 960px) and (max-width:480px) {
    .button-3 {
        padding: 3px 8px;
        border-radius: 3px;
    }
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  /* background-color: #2c974b; */
  background-color: var(--accent-color-hover);
}

.button-3:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.button-3:disabled {
  /* background-color: #94d3a2; */
  background-color: var(--accent-color-disabled);
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.button-3:active {
  /* background-color: #298e46; */
  background-color: var(--accent-color-active);
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
</style>