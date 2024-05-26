import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                red: {
                    '50': '#fff1f1',
                    '100': '#ffdfdf',
                    '200': '#ffc4c4',
                    '300': '#ff9b9b',
                    '400': '#ff6161',
                    '500': '#ff3030',
                    '600': '#f21010',
                    '700': '#cc0909',
                    '800': '#a80c0c',
                    '900': '#8b1111',
                    '950': '#4c0303',
                },

            }
        }
    }
}