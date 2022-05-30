import StarOutlined from "@mui/icons-material/StarOutlined";
import {nanoid} from "nanoid";
import {utils} from "./utils";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

interface StarsProps {
  count: number
}

const Stars = ({count}: StarsProps) => {
  return <>
    {utils.range(1, count).map(_ => <Grid item key={nanoid()} xs={4}><Typography
        align="center"><StarOutlined fontSize="large"
                                     color="secondary"/></Typography></Grid>)}
  </>
}

export default Stars