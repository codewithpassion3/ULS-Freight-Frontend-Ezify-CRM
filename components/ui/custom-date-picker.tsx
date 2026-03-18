"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export function CustomDateRangePicker() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-[240px]">
           <Button variant="outline" className="flex-1 rounded-r-none font-normal justify-start px-3 text-slate-700">
             Feb 26, 2026 - Mar 5, 2026
           </Button>
           <Button className="rounded-l-none bg-[#0070c0] hover:bg-[#005999] px-3">
             <CalendarIcon size={16} />
           </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-4" align="start">
        {/* Top Buttons */}
        <div className="flex justify-between items-center mb-6">
           <div className="flex gap-2">
             <Button variant="outline" className="text-[#0070c0] border-[#0070c0]">Today</Button>
             <Button className="bg-[#0070c0] hover:bg-[#005999]">Last 7 days</Button>
             <Button variant="outline" className="text-[#0070c0] border-[#0070c0]">Last 14 days</Button>
             <Button variant="outline" className="text-[#0070c0] border-[#0070c0]">Custom</Button>
           </div>
           <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><span className="text-xl leading-none">&times;</span></Button>
        </div>

        {/* Mock Calendar Area */}
        <div className="border rounded-md p-4 mb-4">
          <div className="flex gap-8">
            {/* Left Calendar */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground cursor-pointer">&#10094;</span>
                <div className="flex gap-2">
                  <select className="border border-slate-300 rounded px-2 py-1 text-sm bg-white"><option>Feb</option></select>
                  <select className="border border-slate-300 rounded px-2 py-1 text-sm bg-white"><option>2026</option></select>
                </div>
                <span className="text-muted-foreground mx-2">&#10095;</span>
              </div>
              <div className="text-center font-semibold mb-4 text-slate-700">February 2026</div>
              <div className="grid grid-cols-7 text-center gap-y-2 text-sm text-muted-foreground mb-2">
                 <div className="text-teal-600 font-medium">Su</div>
                 <div className="text-teal-600 font-medium">Mo</div>
                 <div className="text-teal-600 font-medium">Tu</div>
                 <div className="text-teal-600 font-medium">We</div>
                 <div className="text-teal-600 font-medium">Th</div>
                 <div className="text-teal-600 font-medium">Fr</div>
                 <div className="text-teal-600 font-medium">Sa</div>
              </div>
              <div className="grid grid-cols-7 text-center gap-y-2 text-sm text-slate-400">
                 <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
                 <div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div>
                 <div>15</div><div>16</div><div>17</div><div>18</div><div className="text-slate-800 font-medium">19</div><div className="text-slate-800 font-medium">20</div><div className="text-slate-800 font-medium">21</div>
                 <div className="text-slate-800 font-medium">22</div><div className="text-slate-800 font-medium">23</div><div className="text-slate-800 font-medium">24</div><div className="text-slate-800 font-medium">25</div>
                 <div className="bg-[#0070c0] text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto absolute -ml-1">26</div>
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800">26</div>
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800">27</div>
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800 rounded-r-md">28</div>
              </div>
            </div>

            {/* Right Calendar */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground invisible">&#10094;</span>
                <div className="flex gap-2"></div>
                <span className="text-muted-foreground cursor-pointer">&#10095;</span>
              </div>
              <div className="text-center font-semibold mb-4 text-slate-700">March 2026</div>
              <div className="grid grid-cols-7 text-center gap-y-2 text-sm text-muted-foreground mb-2">
                 <div className="text-teal-600 font-medium">Su</div>
                 <div className="text-teal-600 font-medium">Mo</div>
                 <div className="text-teal-600 font-medium">Tu</div>
                 <div className="text-teal-600 font-medium">We</div>
                 <div className="text-teal-600 font-medium">Th</div>
                 <div className="text-teal-600 font-medium">Fr</div>
                 <div className="text-teal-600 font-medium">Sa</div>
              </div>
              <div className="grid grid-cols-7 text-center gap-y-2 text-sm text-slate-400">
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800 rounded-l-md">1</div>
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800">2</div>
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800">3</div>
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800">4</div>
                 <div className="bg-[#0070c0] text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto absolute -ml-1">5</div>
                 <div className="bg-blue-100 w-full h-8 flex items-center justify-center text-slate-800">5</div>
                 <div className="text-slate-800 font-medium">6</div><div className="text-slate-800 font-medium">7</div>
                 <div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div>
                 <div>15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div><div>21</div>
                 <div>22</div><div>23</div><div>24</div><div>25</div><div>26</div><div>27</div><div>28</div>
                 <div>29</div><div>30</div><div>31</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4 text-sm">
          <span className="text-slate-700">Feb 26, 2026 - Mar 5, 2026</span>
          <Button className="bg-[#0070c0] hover:bg-[#005999] px-6">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
