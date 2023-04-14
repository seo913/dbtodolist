const express = require("express");
const {PrismaClient} = require("@prisma/client") // 선언

const router = express.Router();


const client = new PrismaClient(); //프리즈마클라이언트를 클라이언트로 사용하겠다.

//유저생성
router.post("/", async (req, res) => {
    try {
      const { account } = req.body;
      
      const existUser = await client.user.findUnique({
        where: {
          account,
        },
      }) ;
      if(existUser){
        return res.status(400).json({ok:false, error: "Already exist account."});
      };


      const user = await client.user.create({
        data: {
          account,
        },
      });
  
      res.json({ ok: true, user });
    } catch (error) {
      console.error(error);
    }
  });


//유저조회
router.get('/:account', async(req,res)=>{
  try {
    const {account} =req.params;

    const user = await client.user.findUnique({
      where: {
        account,
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Not exist user.",
      });
    }

    res.json({
      ok: true,
      user,
    });

  } catch (error) {
    console.error(error);
  }
})
module.exports = router;