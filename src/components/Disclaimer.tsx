import style from './Disclaimer.module.css'

export function Disclaimer() {
  return (
    <div className={style.disclaimer}>
      <a href="https://github.com/jedluk/img2palette/tree/main?tab=readme-ov-file#disclaimer">
        <abbr title="img2palette is an independent tool and is not affiliated with or endorsed by RAL gGmbH. RAL color values are approximations based on publicly available data. See full disclaimer.">
          <span>&copy;</span>
        </abbr>
      </a>
      <a
        target="_blank"
        href="https://staging.riverside.fm/webinar/directlink/eyJzbHVnIjoicmVncmVzc2lvbjE3LTAzLTIwMjUiLCJldmVudElkIjoiNjdlYWIxYzBlYjZkMWQ1NWQ2NjhmNzgxIiwicHJvamVjdElkIjoiNjdlYWIxYzBlYjZkMWQ0MzBjNjhmNzdmIn0="
      >
        Dla Mariusza
      </a>
    </div>
  )
}
